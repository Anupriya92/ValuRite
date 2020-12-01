// Method for Generating random password
export default function generatePassword(): string {
      const alphaCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const alphaSmall = "abcdefghijklmnopqrstuvwxyz";
      const specialChars = "!%&@#$^*?_~";
      const numbers = "1234567890";
      let password = '';
      password = [alphaCaps, alphaSmall, specialChars, numbers].reduce((acc, cur)=> 
        acc += createString(cur, 2), password);
      return password;
    }
    const createString = (stringSource, strlength) : string => {
      let temp = "";
      for( let i=0; i<strlength; i++) {
        const index = Math.floor(Math.random() * stringSource.length);
        temp += stringSource.charAt(index);
      }
      return temp;
}
