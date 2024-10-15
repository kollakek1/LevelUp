export default function Message({ message, compact }) {
    if (compact) {
        return (
            <div className="flex w-full px-2 py-0.5 duration-75 hover:bg-base-200/50 rounded-btn">
                <p>{message.text}</p>
            </div>
        );
    }
    else if (!compact) {
        return (
            <div className="flex items-start w-full px-2 py-0.5 duration-75 hover:bg-base-200/50 rounded-btn mt-1">
                <div>

                </div>
                <div>
                    <div className="flex items-end gap-2">
                        <p className="font-medium hover:link">{message.user.username}</p>
                        <span className="text-sm opacity-70 tooltip tooltip-right" data-tip={
                            (() => {
                                const now = Date.now() / 1000;
                                const diff = now - message.time / 1000;
                                if (diff < 60) return 'менее минуты назад';
                                if (diff < 120) return 'минуту назад';
                                if (diff < 3600) return `${Math.floor(diff / 60)} минут${diff / 60 < 5 ? 'ы' : ''} назад`;
                                if (diff < 7200) return `${Math.floor(diff / 3600)} часа назад`;
                                if (diff < 86400) return `${Math.floor(diff / 3600)} часов назад`;
                                if (diff < 604800) return `${Math.floor(diff / 86400)} дней назад`;
                                return 'более недели назад';
                            })()
                        }>
                            {new Intl.DateTimeFormat('ru-RU', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date(message.time))}
                        </span>
                    </div>
                    <p>{message.text}</p>
                </div>
            </div>
        );
    }
}