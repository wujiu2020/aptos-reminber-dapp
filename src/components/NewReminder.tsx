import { useState } from "react";

interface NewReminderProps {
    onAddReminders: (title: string) => void;
}

function NewReminder({ onAddReminders }: NewReminderProps) {
    const [title, setTitle] = useState('');

    const addReminder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;
        onAddReminders(title);
        setTitle('');
    }

    return (
        <form action="" onSubmit={addReminder}>
            <label htmlFor="title"></label>
            <input value={title} type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} />
            <button className="btn btn-primary rounded-pill my-3">Add Reminder</button>
        </form>
    );
}

export default NewReminder;