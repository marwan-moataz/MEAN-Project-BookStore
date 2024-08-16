import { AbstractControl } from '@angular/forms';

export const PasswordMatchValidator = (
  PasswordControlName: any,
  confirmPasswordControlName: any
) => {
  const validator = (form: AbstractControl) => {
    const passwordControl = form.get(PasswordControlName);
    const confirmPasswordControl = form.get(confirmPasswordControlName);

    if (!passwordControl || !confirmPasswordControl) return;
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ notMatch: true });
    } else {
      const errors = confirmPasswordControl.errors;
      if (!errors) return;

      delete errors['notMatch'];
      confirmPasswordControl.setErrors(errors);
    }
  };
  return validator;
};
