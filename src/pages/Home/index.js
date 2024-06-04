import React from 'react';
import VirtualWaterfall from '@components/VirtualWaterfall';
import './index.less'

function Home() {
    const req = async (tpage, size) => {
        // 请求，并传入分页参数
        const request = await fetch(
            `https://www.vilipix.com/api/v1/picture/public?limit=${size}&sort=hot&offset=${--tpage * size}`
        );
        // 数据处理
        let {
            data: { rows }
        } = await request.json();
        rows = rows.map((item) => ({
            id: item.picture_id,
            width: item.width,
            height: item.height,
            src: item.regular_url + '?x-oss-process=image/resize,w_240/format,jpg'
        }));
    
        return rows;
    };

    return (
        <div className='home'>
            <VirtualWaterfall request={req} column={5} pageSize={25} gap={15} >
                {(detail) => (
                    <div className="card-item">
                        <img src={detail.src} />
                    </div>
                )}
            </VirtualWaterfall>
        </div>
    );
}

export default Home;
