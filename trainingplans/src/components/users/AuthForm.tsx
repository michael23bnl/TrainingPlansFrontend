import React from "react";

interface AuthField {
    name: string;
    value: string;
    placeholder: string;
    type?: string;
    onChange: (value: string) => void;
}

interface AuthFormProps {
    title: string;
    fields: AuthField[];
    onSubmit: () => void;
    submitButtonText: string;
    footer?: React.ReactNode;
}

export const AuthForm: React.FC<AuthFormProps> = ({
    title,
    fields,
    onSubmit,
    submitButtonText,
    footer,
}) => {
    return (
        <div className="flex justify-center min-h-screen p-4">
            <div className="flex flex-col w-[400px] h-fit p-7 bg-gradient-to-br from-[rgba(38,41,82,0.85)] to-[rgba(25,28,70,0.9)] rounded-[10px] mt-[60px]">
                <span className="text-[#f4f4f8] border-[rgba(204,204,224,0.52)] border-b-2 w-fit mb-10 font-semibold text-left">
                    {title}
                </span>
                <div className="flex flex-col items-center max-w-md gap-4">
                    {fields.map((field) => (
                        <input
                            key={field.name}
                            type={field.type || "text"}
                            className="p-3 border border-[rgba(123,123,143,0.52)] rounded-4xl 
                                    shadow-inner bg-[rgba(204,204,224,0.52)] 
                                    focus:outline-none focus:ring-2 focus:ring-[rgba(123,123,143,0.52)]
                                    focus:bg-[rgba(255,255,255,0.52)] focus:shadow-sm 
                                    transition-all duration-200 !text-[#000000] font-semibold w-full"
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                        />
                    ))}
                    <button
                        className="p-3 !m-3 bg-blue-600 text-[#f4f4f8] 
                            !rounded-4xl hover:bg-blue-500 
                            transition-colors font-semibold w-full"
                        type="button"
                        onClick={onSubmit}
                    >
                        {submitButtonText}
                    </button>
                </div>
                {footer && (
                    <div className="flex flex-col items-center gap-4 border-t-2 border-[rgba(204,204,224,0.52)] w-full mt-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};
