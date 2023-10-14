import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { INavItems } from '@/interfaces/nav.interface';
import Transition from '../Transition';

const DropContent = ({
  link = true,
  children,
  items,
  classNames,
}: {
  // eslint-disable-next-line react/require-default-props
  link?: boolean;
  children: React.ReactNode;
  items: INavItems[];
  classNames: string;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) {
        return;
      }
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }

      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative inline-flex">
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        ref={trigger}
        role="button"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        onKeyDown={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {children}
      </div>

      <Transition
        className="origin-top-right z-50 w-full absolute top-full right-0 min-w-44 bg-brand-blue-light rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          className="w-full h-full"
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <ul className="flex flex-col  ">
            {items.map((each, index) => (
              <li key={each.label}>
                {link ? (
                  <Link href={`/${each.path}`}>
                    <a
                      onClick={() => setDropdownOpen(false)}
                      href="#zeddi"
                      className={
                        `font-medium flex items-center hover:bg-brand-bold py-2 px-8 w-full` +
                        ` ${classNames}`
                      }
                    >
                      {each.label}
                    </a>
                  </Link>
                ) : (
                  <a
                    href="#zeddi"
                    className={
                      `font-medium flex items-center py-1 px-3 w-full` +
                      ` ${classNames}`
                    }
                  >
                    {each.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </div>
  );
};

export default DropContent;
