export interface ICompanyLocation {
  type: 'Point';
  coordinates: [number, number];
}

export interface ICompanyInformation {
  companyDescription?: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  address?: string;
  country?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface IAuthorId {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  image: string;
  phoneNumber?: string;
  subscription: {
    _id: string;
    name: string;
    icon: string;
  };
}

interface ICompanyImage {
  _id?: string | number;
  originalFile?: Record<string, any>;
  imageUrl: string;
  file: Record<string, any>;
}

export interface ICompany {
  _id: string;
  companyName: string;
  companyLocation: ICompanyLocation;
  companyInformation: ICompanyInformation;
  authorId: IAuthorId;
  companyAbout: string;
  companyType: string;
  slug: string;
  companyImages: ICompanyImage[];
  avgRating: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
