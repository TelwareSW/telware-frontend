import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import FloatingLabelInput from "@inputs/float_label_input/FloatingLabelInput";
import { DevTool } from "@hookform/devtools";

const DemoContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-background);
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-text);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const SubmitButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-text);
`;

interface DemoForm {
  basicInput: string;
  requiredInput: string;
  email: string;
  password: string;
  maxLengthInput: string;
  disabledInput: string;
  numberInput: number;
  searchInput: string;
  urlInput: string;
  telInput: string;
}

const validationSchema = yup.object({
  basicInput: yup.string(),
  requiredInput: yup.string().required("This field is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
  maxLengthInput: yup.string().max(20, "Maximum 20 characters allowed"),
  numberInput: yup
    .number()
    .typeError("Please enter a valid number")
    .required("This field is required")
    .min(0, "Number must be positive"),
  urlInput: yup.string().url("Please enter a valid URL"),
  telInput: yup
    .string()
    .matches(/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number"),
});

function FloatingLabelInputDemo() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DemoForm>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      basicInput: "Amir",
    },
  });

  const onSubmit = async (data: DemoForm) => {
    console.log("Submitting form...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      alert("Form submitted successfully! Check console for data.");
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error submitting form!");
    }
  };

  console.log(errors);

  return (
    <DemoContainer>
      <DevTool control={control} placement="top-right" />
      <Title>Floating Label Input Demo</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <SectionTitle>Basic States</SectionTitle>
          <Grid>
            <FloatingLabelInput<DemoForm>
              id="basicInput"
              label="Basic Input"
              register={register}
              watch={watch}
            />

            <FloatingLabelInput<DemoForm>
              id="requiredInput"
              label="Required Input"
              register={register}
              watch={watch}
              error={errors.requiredInput?.message}
            />

            <FloatingLabelInput<DemoForm>
              id="disabledInput"
              label="Disabled Input"
              register={register}
              watch={watch}
              disabled
            />
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Validation Examples</SectionTitle>
          <Grid>
            <FloatingLabelInput<DemoForm>
              id="email"
              label="Email"
              type="email"
              register={register}
              error={errors.email?.message}
              watch={watch}
              validation={(value) => {
                try {
                  validationSchema.validateSyncAt("email", {
                    email: value,
                  });
                  return true;
                } catch {
                  return false;
                }
              }}
            />

            <FloatingLabelInput<DemoForm>
              id="password"
              label="Password"
              type="password"
              register={register}
              error={errors.password?.message}
              watch={watch}
              validation={(value) => {
                try {
                  validationSchema.validateSyncAt("password", {
                    password: value,
                  });
                  return true;
                } catch {
                  return false;
                }
              }}
            />

            <FloatingLabelInput<DemoForm>
              id="maxLengthInput"
              label="Max Length (20 chars)"
              register={register}
              watch={watch}
              error={errors.maxLengthInput?.message}
              maxLength={20}
            />
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Input Types</SectionTitle>
          <Grid>
            <FloatingLabelInput<DemoForm>
              id="numberInput"
              label="Number Input"
              type="number"
              register={register}
              watch={watch}
              error={errors.numberInput?.message}
            />

            <FloatingLabelInput<DemoForm>
              id="urlInput"
              label="URL Input"
              type="url"
              register={register}
              watch={watch}
              error={errors.urlInput?.message}
            />

            <FloatingLabelInput<DemoForm>
              id="telInput"
              label="Phone Number"
              type="tel"
              watch={watch}
              register={register}
              error={errors.telInput?.message}
            />
          </Grid>
        </Section>

        <FormGroup>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </SubmitButton>
        </FormGroup>
      </form>
    </DemoContainer>
  );
}

export default FloatingLabelInputDemo;
