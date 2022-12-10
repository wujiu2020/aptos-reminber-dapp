import React from 'react';
import { Reminder } from '../models/Reminder'

interface ReminderProps {
    iterms: Reminder[],
    onDeleteReminder: (id: string) => void
}

function ReminderList({ iterms, onDeleteReminder }: ReminderProps) {
    return (
        <ul className="list-group">
            {iterms.map(
                iterm =>
                    <li key={iterm.id} className="list-group-item">{iterm.title}
                        <button onClick={() => onDeleteReminder(iterm.id)} className="btn btn-outline-danger mx-3">Delete</button>
                    </li>
            )}
        </ul>
    );
}

export default ReminderList;