import React from 'react';

const api_key = 'a8cb9d5e8c5171f7522740917ea56435';

function Location({ item }) {
    const idString = `https://api.openweathermap.org/data/2.5/weather?id=${item.id}&appid=${api_key}`;
    const nameString = `https://api.openweathermap.org/data/2.5/weather?q=${item.name}&appid=${api_key}`;
    const data = fetch(idString).then(response => response.json());
    return (
        <div className="location-item-div">
            <p>{item.name}</p>
            <p>URL by id: {idString}</p>
            <p>URL by name: {nameString}</p>
            <p>Temperature: {JSON.stringify(data)}</p>
        </div>
    )
}

export default Location;
