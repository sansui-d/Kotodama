import React from 'react';
import VirtualWaterfall from '@components/VirtualWaterfall';
import './App.css'

function App() {
    const request = async (tpage, size) => {
        const request = await fetch(`https://www.vilipix.com/api/v1/picture/public?limit=${size}&sort=new&offset=${--tpage * size}`);
        let {data: { rows }} = await request.json();
        rows = rows.map((item) => ({
            id: item.picture_id,
            width: item.width,
            height: item.height,
            src: item.regular_url + '?x-oss-process=image/resize,w_240/format,jpg'
        }));
        return rows;
    };
    return (
        <div className="app">
            <VirtualWaterfall request={request} column={5} pageSize={30} gap={15} />
        </div>
    );
}

export default App;
