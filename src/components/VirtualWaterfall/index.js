import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.less';

const VirtualWaterfall = (props) => {
    const { column, pageSize, gap, request } = props;

    const [loading, setLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    // 图片信息list
    const [list, setList] = useState([]);
    // 瀑布流列信息
    const [columns, setColumns] = useState(() => new Array(column).fill(0).map(() => ({ list: [], height: 0 })))
    // 图片总数
    const [total, setTotal] = useState(0)
    // 列表样式
    const [listStyle, setListStyle] = useState({});

    const scrollBoxRef = useRef(null);

    // 展示的列表
    const renderList = useMemo(() => {
        const end = scrollBoxRef.current?.clientHeight + scrollBoxRef.current?.scrollTop;
        const cardList = columns.reduce((pre, { list }) => pre.concat(list), []);
        return cardList.filter((i) => i.h + i.y > scrollBoxRef.current?.scrollTop && i.y < end)
    }, [columns, scrollBoxRef.current?.clientHeight, scrollBoxRef.current?.scrollTop]);

    const getMinColumnHeight = useCallback(() => {
        let minIndex = 0,
            minHeight = Infinity,
            maxHeight = -Infinity;
        columns.forEach(({ height }, index) => {
            if (height < minHeight) {
                minHeight = height;
                minIndex = index;
            }
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        setListStyle({ height: maxHeight });
        return {
            minIndex,
            minHeight
        };
    }, [columns]);

    const getItemInfo = (item, before, index) => {
        const {width, height} = list.filter((i) => i?.id === item?.id)?.[0] || {};
        const y = before ? before?.y + before?.h + gap : 0

        return {
            item,
            y,
            h: height,
            style: {
                width: `${width}px`,
                height: `${height}px`,
                transform: `translate3d(${index === 0 ? 0 : (width + gap) * index}px, ${y}px, 0)`
            }
        };
    };

    const getColumnsInfo = () => {
        let currentTotal = total
        const cloneColumns = columns;
        for (let i = 0; i < pageSize; i++) {
            // 高度最小列
            const minIndex = getMinColumnHeight().minIndex;
            const currentColumn = cloneColumns[minIndex];
            // 高度最小列最后一张图片
            const before = currentColumn.list[currentColumn.list.length - 1] || null;
            const dataItem = list[currentTotal];
            const item = getItemInfo(dataItem, before, minIndex);
            currentColumn.list.push(item);
            currentColumn.height += item.h;
            currentTotal += 1;
        }
        setColumns([...cloneColumns])
        setTotal(currentTotal)
    };

    const getList = async () => {
        if (isFinish || !request) return;
        try {
            setLoading(true)
            const res = await request(pageNo + 1, pageSize);
            if (!res?.length) {
                setIsFinish(true)
                return;
            }
            setLoading(false);
            setPageNo(pageNo + 1);
            // 计算出图片实际应该显示的宽度和高度
            const addList = res?.map((item) => {
                const itemWidth = Math.floor((scrollBoxRef.current?.clientWidth - (column - 1) * gap) / column);
                const itemHeight = Math.floor((itemWidth * item.height) / item?.width);
                return {
                    ...item,
                    width: itemWidth,
                    height: itemHeight
                }
            });
            setList([...list, ...addList]);
        } catch(err) {
            console.log(err)
        }
    };

    const throttle = (fn) => {
        let lock = false;
        return (...args) => {
            if (lock) return;
            lock = true;
            window.requestAnimationFrame(() => {
                fn.apply(this, ...args);
                lock = false;
            });
        };
    }

    const handleScroll = throttle(() => {
        const { scrollTop, clientHeight } = scrollBoxRef.current;
        if (scrollTop + clientHeight >= getMinColumnHeight().minHeight) {
            !loading && getList();
        }
    });

    useEffect(() => {
        list?.length && getColumnsInfo();
    }, [list]);

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className="virtual-waterfall-container" ref={scrollBoxRef} onScroll={handleScroll}>
            <div className="virtual-waterfall-list" style={listStyle}>
                {renderList.map(({ item, style }) => (
                    <div className="virtual-waterfall-item" key={item.id} style={style}>
                        <div className="virtual-waterfall-item-card">
                            <img className='virtual-waterfall-item-img' src={item.src} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VirtualWaterfall;
