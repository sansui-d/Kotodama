import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { rafThrottle } from './tool';
import './index.less';

const VirtualWaterfall = (props) => {
    const { column, pageSize, gap, request } = props;

    const [loading, setLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [list, setList] = useState([]);

    const [columns, setColumns] = useState(() => new Array(column).fill(0).map(() => ({ list: [], height: 0 })))
    const [total, setTotal] = useState(0)

    const [listStyle, setListStyle] = useState({});

    const scrollBoxRef = useRef(null);

    const itemSizeInfo = useMemo(() => {
        return list?.reduce((pre, current) => {
            const itemWidth = Math.floor((scrollBoxRef.current?.clientWidth - (column - 1) * gap) / column);
            pre.set(current?.id, {
                width: itemWidth,
                height: Math.floor((itemWidth * current.height) / current?.width)
            });
            return pre;
        }, new Map());
    }, [list]);

    useEffect(() => {
        itemSizeInfo.size && addInQueue();
    }, [itemSizeInfo]);

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

    const addInQueue = (size = pageSize) => {
        let currentTotal = total
        for (let i = 0; i < size; i++) {
            const minIndex = getMinColumnHeight().minIndex;
            const currentColumn = columns[minIndex];
            const before = currentColumn.list[currentColumn.list.length - 1] || null;
            const dataItem = list[currentTotal];
            const item = generatorItem(dataItem, before, minIndex);
            currentColumn.list.push(item);
            currentColumn.height += +item.h;
            currentTotal += 1;
        }
        setColumns([...columns])
        setTotal(currentTotal)
    };

    const generatorItem = (item, before, index) => {
        const rect = itemSizeInfo.get(item?.id);
        // console.log(rect, 'rect')
        const width = rect?.width;
        const height = rect?.height;
        let y = 0;
        if (before) y = before?.y + before?.h + gap;

        return {
            item,
            y: +y,
            h: +height,
            style: {
                width: `${width}px`,
                height: `${height}px`,
                transform: `translate3d(${index === 0 ? 0 : (width + gap) * index}px, ${y}px, 0)`
            }
        };
    };

    const getDataList = async () => {
        if (isFinish || !request) return;
        try {
            setLoading(true)
            const res = await request(pageNo + 1, pageSize);
            if (!res?.length) {
                setIsFinish(true)
                return;
            }
            setLoading(false);
            setPageNo(pageNo + 1)
            setList([...list, ...res]);
        } catch(err) {
            console.log(err)
        }
    };

    const handleScroll = rafThrottle(() => {
        const { scrollTop, clientHeight } = scrollBoxRef.current;
        if (scrollTop + clientHeight >= getMinColumnHeight().minHeight) {
            !loading && getDataList();
        }
    });

    useEffect(() => {
        getDataList();
    }, []);

    return (
        <div className="virtual-waterfall-container" ref={scrollBoxRef} onScroll={handleScroll}>
            <div className="virtual-waterfall-list" style={listStyle}>
                {renderList.map(({ item, style }) => (
                    <div className="virtual-waterfall-item" key={item.id} style={style}>
                        {props.children(item)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VirtualWaterfall;
