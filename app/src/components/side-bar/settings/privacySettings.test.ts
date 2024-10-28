// import "@testing-library/react";
// import "@testing-library/jest-dom";
// import { RadioInputProps } from "@components/inputs/RadioInput";
// import { render } from "./test-utils";
// import RadioInput from "@components/inputs/RadioInput";
// import { Provider } from 'react-redux';

// // Custom render function with Redux provider
// function renderWithRedux(ui, { , store = createTestStore(preloadedState) } = {}) {
//   return {
//     ...render(<Provider store={store}>{ui}</Provider>),
//     store,
//   };
// }
// describe("Radio Button", () => {
//   const mockData: RadioInputProps = {
//     data: {
//       id: "lastSeenPrivacy",
//       options: [
//         { id: "everyone", label: "everyone", value: "EVERYONE" },
//         { id: "contacts", label: "contacts", value: "CONTACTS" },
//         { id: "nobody", label: "nobody", value: "NOBODY" },
//       ],
//       title: "Last Seen Privacy",
//     },
//   };

//   const TestWrapper = ({
//     defaultValues = {},
//     validation = () => {},
//   }) => {
//     const { register, watch } = useForm({ defaultValues });
//     return (
//       <RadioInput

//       />
//     );
//   };

//   it("renders all options", () => {
//     const { getByText } = render(<RadioInput {...mockData}/>);
//   });
// });
