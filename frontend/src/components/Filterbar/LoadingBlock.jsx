import React from "react";
import ContentLoader from "react-content-loader";

import { useBreakpoint } from "../../hooks";

const LoadingBlock = (props) => {
	const isLargeDevices = useBreakpoint("min-width", 991.98);
	return (
		<React.Fragment>
			{isLargeDevices && (
				<ContentLoader
					speed={2}
					width={288}
					height={675}
					viewBox="0 0 288 675"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
					{...props}
				>
					<rect x="20" y="25" rx="6" ry="6" width="84" height="12" />
					<rect x="20" y="62" rx="6" ry="6" width="112" height="46" />
					<rect
						x="156"
						y="62"
						rx="6"
						ry="6"
						width="112"
						height="46"
					/>
					<rect
						x="20"
						y="127"
						rx="6"
						ry="6"
						width="248"
						height="11"
					/>
					<rect x="20" y="188" rx="6" ry="6" width="84" height="12" />
					<rect
						x="20"
						y="224"
						rx="6"
						ry="6"
						width="248"
						height="101"
					/>
					<rect x="20" y="375" rx="6" ry="6" width="84" height="12" />
					<rect
						x="20"
						y="411"
						rx="7"
						ry="7"
						width="248"
						height="101"
					/>
					<rect
						x="20"
						y="560"
						rx="6"
						ry="6"
						width="248"
						height="46"
					/>
					<rect
						x="20"
						y="627"
						rx="6"
						ry="6"
						width="248"
						height="46"
					/>
				</ContentLoader>
			)}
			{!isLargeDevices && (
				<ContentLoader
					speed={2}
					width={288}
					height={46}
					viewBox="0 0 288 46"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
					{...props}
				>
					<rect x="0" y="0" rx="6" ry="6" width="46" height="46" />
					<rect x="65" y="16" rx="6" ry="6" width="77" height="10" />
				</ContentLoader>
			)}
		</React.Fragment>
	);
};

export default LoadingBlock;
