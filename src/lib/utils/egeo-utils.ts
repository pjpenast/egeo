export class EgeoUtils {

   static isDefined(value: any): boolean {
      return value !== undefined && value !== null;
   }

   static validateInputs(scope: any, inputs: string[], component: string): void {
      inputs.forEach((input) => {
         if (!this.isDefined(scope[input])) {
            throw new Error(`${this.toDash(component)}: field ${input} is a required field`);
         }
      });
   }

   static toDash(value: string): string {
      try {
         return value.replace(/([A-Z])/g, ($1) => '-' + $1.toLowerCase()).substring(1);
      } catch (err) {
         return value;
      }
   }
}
