import React from "react";

const LoadingIndicator: React.FC = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="loader h-24 w-24 animate-spin rounded-full border-4 border-t-4 border-dotted"></div>
        </div>
    );
};

export default LoadingIndicator;
