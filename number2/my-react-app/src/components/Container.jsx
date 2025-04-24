import React, { useState, useEffect } from 'react';
import Greeting from './Greeting';
import Clock from './Clock';
import Header from './Header';

const Container = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        const generateName = () => {
            const randomName = `User${Math.floor(Math.random() * 1000)}`;
            setName(randomName);
        };

        generateName();

        const intervalId = setInterval(generateName, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <Header />
            <Greeting name={name} />
            <Clock />
        </div>
    );
};

export default Container;