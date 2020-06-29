import React, {
    useRef, useState, useEffect, useCallback,
} from 'react';
import handleKeyDown from '../utils/handleKeyDown';
import { useWindowWidth } from '../utils/withModal';

const HorizontalScrollableSelectMenu = ({
    id, className, values, selected, onSelectionChange,
}) => {
    const menuRef = useRef();
    const [scrollLeft, setScrollLeft] = useState(0);

    const calculateRightScrollable = scrollLeftSize => scrollLeftSize > (
        menuRef.current?.parentNode.clientWidth - menuRef.current?.clientWidth + 1
    );

    const [isRightScrollable, setRightScrollable] = useState(calculateRightScrollable(scrollLeft));

    const scroll = useCallback((deltaY) => {
        const node = menuRef.current;
        if (node) {
            setScrollLeft(currentScrollLeft => (
                Math.min(0,
                    Math.max(currentScrollLeft + deltaY,
                        node.parentNode.clientWidth - node.clientWidth + 1))
            ));
        }
    }, []);

    useEffect(() => {
        const node = menuRef.current;
        if (node) {
            node.addEventListener('wheel', (e) => {
                e.preventDefault();
                window.requestAnimationFrame(() => {
                    scroll(e.deltaY);
                });
            });
        }
        return () => {
            if (node) {
                node.removeEventListener('scroll');
            }
        };
    }, [scroll]);

    // refresh on resize
    const size = useWindowWidth();
    useEffect(() => {
        scroll(0);
    }, [size, values, scroll]);

    useEffect(() => {
        setRightScrollable(calculateRightScrollable(scrollLeft));
    }, [scrollLeft, size, values]);

    return (
        <div id={id} className={className}>
            {scrollLeft !== 0 && (
                <div
                    className='before'
                    role='button'
                    tabIndex={-1}
                    onClick={() => scroll(100)}
                    onKeyDown={handleKeyDown(() => scroll(100), ' ')}
                >
                    <span>{'<'}</span>
                </div>
            )}
            <div className='wrapper'>
                <ul
                    ref={menuRef}
                    style={{ marginLeft: scrollLeft }}
                >
                    {values.map(value => (
                        <li
                            className={value.toUpperCase()
                                === selected?.toUpperCase()
                                ? 'selected'
                                : ''}
                            tabIndex={0}
                            onClick={onSelectionChange}
                            onKeyDown={handleKeyDown(onSelectionChange, ' ')}
                            key={value}
                            role='option'
                            aria-selected={value.toUpperCase()
                                  === selected?.toUpperCase()}
                        >
                            <span>{value.toUpperCase()}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {isRightScrollable && (
                <div
                    className='after'
                    role='button'
                    tabIndex={-1}
                    onClick={() => scroll(-100)}
                    onKeyDown={handleKeyDown(() => scroll(-100), ' ')}
                >
                    <span>{'>'}</span>
                </div>
            )}
        </div>
    );
};

export default HorizontalScrollableSelectMenu;
