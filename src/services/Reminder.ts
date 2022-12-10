import { stringToHex } from '../utils/utils'

export class ReminderService {
    type = "entry_function_payload";
    resource = "reminder_list";
    address = "0x43501e1d605075a7cd7047f735224beafb6f67c30b391315ff376374f39c1109";

    async addReminder(id: string, title: string) {
        const transaction = {
            type: this.type,
            function: `${this.address}::${this.resource}::add_reminder`,
            arguments: [stringToHex(id), stringToHex(title)],
            type_arguments: [],
        }
        const response = await window.aptos.signAndSubmitTransaction(transaction);
        console.log(response)
    }

    async deleteReminder(id: string) {
        const transaction = {
            type: this.type,
            function: `${this.address}::${this.resource}::delete_reminder`,
            arguments: [stringToHex(id)],
            type_arguments: [],
        }
        const response = await window.aptos.signAndSubmitTransaction(transaction);
        console.log(response)
    }

    async getReminder(id: string) {
        const transaction = {
            type: this.type,
            function: `${this.address}::${this.resource}::get_reminder`,
            arguments: [stringToHex(id)],
            type_arguments: [],
        }
        const response = await window.aptos.signAndSubmitTransaction(transaction);
        console.log(response)
    }
}

export const ReminderServiceInstance = new ReminderService()