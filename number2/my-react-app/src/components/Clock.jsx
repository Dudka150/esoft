import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const minutes = time.getMinutes();
    const formattedTime = time.toLocaleTimeString();

    return (
        <div>
            <p>Текущее время: {formattedTime}</p>
            {minutes % 5 === 0 && <p>Время делится на 5</p>}
        </div>
    );
};

export default Clock;