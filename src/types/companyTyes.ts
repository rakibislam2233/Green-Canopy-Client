export interface ICompanyType {
  _id: string;
  companyTypeName: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICompanyImage {
  _id?: string | number;
  originalFile?: Record<string, any>;
  imageUrl: string;
  file: Record<string, any>;
}
