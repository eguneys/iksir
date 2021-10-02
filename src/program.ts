export interface IAttributeData {
  tpe: string;
  size: number;
  location: number;
  name: string;
}

export interface IUniformData {
  name: string;
  index: number;
  location: WebGLUniformLocation;
}

export class Program {
  
     constructor(
       readonly uniformData: { [key: string]: IUniformData },
       readonly attributeData: { [key: string]: IAttributeData },
     readonly program: WebGLProgram) {}
}
