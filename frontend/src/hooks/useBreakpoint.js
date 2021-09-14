import React from "react";

const useBreakpoint = (type, pixeles) => {
	const mediaQueryList = window.matchMedia(`(${type}: ${pixeles}px)`);

	const [isBreakpoint, setIsBreakpoint] = React.useState(
		mediaQueryList.matches ? true : false
	);

	React.useEffect(() => {
		const handleBreakpointEvent = (e) => {
			if (e.matches) {
				setIsBreakpoint(true);
			} else {
				setIsBreakpoint(false);
			}
		};
		mediaQueryList.addListener(handleBreakpointEvent);
		return () => {
			mediaQueryList.removeListener(handleBreakpointEvent);
		};
	}, []);

	return isBreakpoint;
};

export default useBreakpoint;
