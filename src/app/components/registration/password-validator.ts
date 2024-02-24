import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (password && passwordConfirm && password !== passwordConfirm) {
        control.get('passwordConfirm')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
    } else if (password && passwordConfirm && password === passwordConfirm) {
        control.get('passwordConfirm')?.setErrors(null);
    }
    return null;
}
