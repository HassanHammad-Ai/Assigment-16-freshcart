export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressPayload {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressListResponse {
  results: number;
  data: Address[];
}
