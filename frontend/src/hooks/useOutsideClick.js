import React from "react";

const useOutsideClick = (elementsRefs, callback) => {
	React.useEffect(() => {
		if (elementsRefs) {
			const handleOutsideClick = (event) => {
				const path =
					event.path || (event.composedPath && event.composedPath());
				const isIncludes = elementsRefs.some((elemRef) =>
					path.includes(elemRef.current)
				);
				if (!isIncludes) {
					callback();
				}
			};
			document.body.addEventListener("click", handleOutsideClick);

			return () => {
				document.body.removeEventListener("click", handleOutsideClick);
			};
		}
	}, []);
};

export default useOutsideClick;
