function Pet(name) {
    this.name = name;       // this will be equal to the object cat
    this.getName = () => this.name;     // this will be equal to the object cat
}

const cat = new Pet('Fluffy');  // since an object of Pet is created
console.log(cat.getName()); // What is logged?      // Fluffy - as this equals cat
const { getName } = cat;        // getName destructured from cat so this is cat
console.log(getName()); // What is logged?          // Fluffy - as this equals cat