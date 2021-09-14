import React from "react";
import ContentLoader from "react-content-loader";

const LoadingBlock = (props) => {
	return (
		<ContentLoader
			speed={2}
			width="100%"
			height={400}
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
			{...props}
		>
			<rect x="0" y="0" rx="6" ry="6" width="100%" height="229" />
			<rect x="0" y="262" rx="6" ry="6" width="70%" height="12" />
			<rect x="0" y="300" rx="6" ry="6" width="100%" height="8" />
			<rect x="0" y="354" rx="6" ry="6" width="100%" height="36" />
		</ContentLoader>
	);
};

export default LoadingBlock;
