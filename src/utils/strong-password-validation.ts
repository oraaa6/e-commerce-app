export function strongPasswordValidation(password?: string) {
   if (password) {
      return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) || "Password should contain between 6 to characters with at least one numeric digit, one uppercase and one lowercase letter"
   }

}