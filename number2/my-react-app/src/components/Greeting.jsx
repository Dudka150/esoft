import React, { useRef, useEffect, useState } from 'react';

const Greeting = ({ name }) => {
    const prevNameRef = useRef('');
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (prevNameRef.current && prevNameRef.current !== name) {
            setChanged(true);
        } else {
            setChanged(false);
        }
        prevNameRef.current = name;
    }, [name]);

    return (
        <div>
            {changed ? (
                <p>Привет, у тебя поменялось имя, теперь ты {name}!</p>
            ) : (
                <p>Привет, {name}!</p>
            )}
        </div>
    );
};

export default Greeting;