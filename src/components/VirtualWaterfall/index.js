import { useEffect, useMemo, useRef, useState } from 'react';
import {useSize, useScroll} from 'react-use'
import { rafThrottle } from './tool';
import './index.less';

const VirtualWaterfall = (props) => {
    const {column, pageSize, gap, request} = props;
    const [loading, setLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [list, setList] = useState([]);

    const [scrollState, setScrollState] = useState({
        viewWidth: 0,
        viewHeight: 0,
        start: 0
    });

    const [columns, setColumns] = useState(() => new Array(column).fill(0).map(() => ({ list: [], height: 0 })))
    const [total, setTotal] = useState(0)

    const [queueState, setQueueState] = useState({
        queue: new Array(column).fill(0).map(() => ({ list: [], height: 0 })),
        len: 0
    });
    const [listStyle, setListStyle] = useState({});

    const scrollBoxRef = useRef(null);
    // const [sized, {width: scrolBoxWidth, height: scrolBoxHeight}] = useSize(scrollBoxRef)
    // const {scrollBoxX, scrollBoxY} = useScroll(scrollBoxRef);

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

    const end = useMemo(() => scrollBoxRef.current?.clientHeight + scrollBoxRef.current?.scrollTop, [scrollBoxRef.current?.clientHeight, scrollBoxRef.current?.scrollTop]);

    const cardList = useMemo(
        () => queueState.queue.reduce((pre, { list }) => pre.concat(list), []),
        [queueState]
    );

    const renderList = useMemo(
        () => cardList.filter((i) => i.h + i.y > scrollBoxRef.current?.scrollTop && i.y < end),
        [queueState, end]
    );

    const computedHeight = () => {
        let minIndex = 0,
            minHeight = Infinity,
            maxHeight = -Infinity;
        queueState.queue.forEach(({ height }, index) => {
            if (height < minHeight) {
                minHeight = height;
                minIndex = index;
            }
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        setListStyle({ height: `${maxHeight}px` });
        return {
            minIndex,
            minHeight
        };
    };

    const addInQueue = (size = pageSize) => {
        const queue = queueState.queue;
        let len = queueState.len;
        for (let i = 0; i < size; i++) {
            const minIndex = computedHeight().minIndex;
            const currentColumn = queue[minIndex];
            const before = currentColumn.list[currentColumn.list.length - 1] || null;
            const dataItem = list[len];
            const item = generatorItem(dataItem, before, minIndex);
            currentColumn.list.push(item);
            currentColumn.height += +item.h;
            len++;
        }
        setQueueState({ queue: [...queue], len });
        setColumns([...queue])
        setTotal(len)
    };

    const generatorItem = (item, before, index)=> {
        const rect = itemSizeInfo.get(item?.id);
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

    const loadDataList = async () => {
        if (isFinish) return;
        setLoading(true)
        // if (!request) return;
        const res = await request(pageNo + 1, pageSize);
        if (!res?.length) {
            setIsFinish(true)
            return;
        }
        setLoading(false);
        setPageNo(pageNo + 1)
        setList([...list, ...res]);
        return res.length;
    }; 

    const handleScroll = rafThrottle(() => {
        const { scrollTop, clientHeight } = scrollBoxRef.current;
        setScrollState({ ...scrollState, start: scrollTop });
        if (scrollTop + clientHeight >= computedHeight().minHeight) {
            !loading && loadDataList();
        }
    });

    const initScrollState = () => {
        setScrollState({
            viewWidth: +scrollBoxRef.current.clientWidth,
            viewHeight: +scrollBoxRef.current.clientHeight,
            start: +scrollBoxRef.current.scrollTop
        });
    };

    const init = async () => {
        initScrollState();
        await loadDataList();
    };

    useEffect(() => {
        init();
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
