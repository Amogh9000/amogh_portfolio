import { useEffect } from 'react';

const useRightClickProtection = (ref) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        element.addEventListener('contextmenu', handleContextMenu);

        return () => {
            element.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [ref]);
};

export default useRightClickProtection;
