import clsx from "clsx";

const Container = ({ id = "", className = "", Tag = "div", children }) => {
	return (
		<Tag
			{...(id && { id })}
			className={clsx("mx-auto px-20 desktop:max-w-[128rem]", className)}>
			{children}
		</Tag>
	);
};

export default Container;
