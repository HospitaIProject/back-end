// import { FormikProps } from 'formik';
// import InputContainer from './InputContainer';
// import { useEffect } from 'react';
// type Props<T> = {
//     label: string;
//     htmlFor: string;
//     formik: FormikProps<T>;
//     unit?: string; // 단위를 나타내는 새로운 prop
//     placeholder?: string; // placeholder를 나타내는 새로운 prop
// };

// function TotalHospitalizedInput<T>({ label, htmlFor, formik }: Props<T>) {
//     // const selectedValue = formik?.getFieldProps(htmlFor).value as 'YES' | 'NO' | '';
//     const isInput = formik?.getFieldProps(htmlFor).value;
//     const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

//     useEffect(() => {
//         if (formik?.getFieldProps('hospitalizedDate').value && formik?.getFieldProps('dischargedDate').value) {
//             const hospitalizedDate = formik?.getFieldProps('hospitalizedDate').value;
//             const dischargedDate = formik?.getFieldProps('dischargedDate').value;

//             formik?.setFieldValue('bmi', bmi.toFixed(2));
//             formik?.setFieldError('bmi', '');
//         } else {
//             formik?.setFieldValue('bmi', '');
//         }
//     }, [formik?.getFieldProps('height').value, formik?.getFieldProps('weight').value]);

//     return (
//         <InputContainer<T> label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
//             <div
//                 className={`bg-red-50 ${isValid ? 'border-2 border-red-400' : ''} flex h-12 flex-grow flex-row items-center gap-2 overflow-hidden rounded-lg border border-gray-300 px-3`}
//             >
//                 <input
//                     type="number"
//                     disabled
//                     value={formik?.getFieldProps('bmi').value}
//                     className="w-full outline-none"
//                 />
//                 <span className="mr-2">kg/m²</span>
//             </div>
//         </InputContainer>
//     );
// }

// export default TotalHospitalizedInput;
