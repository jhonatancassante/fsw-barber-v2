import React from "react";

interface FormatedTitleProps {
    title: string;
    className?: string;
}

const FormatedTitle: React.FC<FormatedTitleProps> = ({ title, className }) => {
    return (
        <h2
            className={`mb-3 mt-6 text-xs font-bold uppercase text-gray-400 ${className}`}
        >
            {title}
        </h2>
    );
};

export default FormatedTitle;
