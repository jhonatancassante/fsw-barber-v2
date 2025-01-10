import React from "react";

interface FormatedTitleProps {
    title: string;
}

const FormatedTitle: React.FC<FormatedTitleProps> = ({ title }) => {
    return (
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            {title}
        </h2>
    );
};

export default FormatedTitle;
