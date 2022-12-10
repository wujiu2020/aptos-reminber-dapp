import React, { useEffect, useState } from 'react';
import './App.css';
import ReminderList from './components/ReminderList';
import { Reminder } from './models/Reminder';
import { ReminderServiceInstance, AptosInstance } from './services';
import NewReminder from './components/NewReminder';
import Login from './components/Login';
import { Types } from 'aptos';
import { hexToString } from './utils/utils'

function App() {
  const [address, setAddress] = useState<string | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [account, setAccount] = React.useState<Types.AccountData | null>(null);

  useEffect(() => {
    getReminderList()
    if (!address) return;
    AptosInstance.getAccount(address).then(setAccount);
  }, [address]);

  const getReminderList = async () => {
    if (!address) return;
    const resourceType = `0x43501e1d605075a7cd7047f735224beafb6f67c30b391315ff376374f39c1109::reminder_list::ReminderList`;
    //todo handle error
    const addResources = await AptosInstance.getEventsByEventHandle(address, resourceType, 'reminder_add_events')
    //todo handle error
    const deleteResources = await AptosInstance.getEventsByEventHandle(address, resourceType, 'reminder_delete_events')
    const tempReminders: Reminder[] = [];
    addResources.forEach(reminder => {
      let exitInDeleteResource = false;
      deleteResources.forEach(
        deleteResource => {
          if (deleteResource?.data.id == reminder.data?.id) {
            exitInDeleteResource = true;
            return
          }
        }
      )
      if (!exitInDeleteResource) {
        tempReminders.push({ id: hexToString(reminder.data.id), title: hexToString(reminder.data.title) })
      }
    })
    setReminders(tempReminders)
  }

  const deleteReminder = async (id: string) => {
    console.log(reminders, id)
    await ReminderServiceInstance.deleteReminder(id)
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }

  const addReminder = async (title: string) => {
    if (!account?.sequence_number) {
      return
    }
    await ReminderServiceInstance.addReminder(account.sequence_number, title)
    setReminders([{ id: account.sequence_number, title: title }, ...reminders])
  }

  return (
    <div className="App">
      <Login address={address} onSetAddress={setAddress} />
      <NewReminder onAddReminders={addReminder} />
      <ReminderList iterms={reminders} onDeleteReminder={deleteReminder} />
    </div>
  );
}

export default App;