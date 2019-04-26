export class Company {
  name: string;
  email: string;
  phone: string;
  town: string;
  street: string;
  country: string;
  zip: string;

  constructor(data?: any) {
    data = data || {};
    this.country = data.country || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.town = data.town || '';
    this.street = data.street || '';
    this.name = data.name || '';
    this.zip = data.zip || '';
  }
}

export class Taxes {
  id: string;
  name: string;
  rate: string;
  selected: boolean;

  constructor(data?: any) {
    data = data || {};
    this.id = data.id || '';
    this.name = data.name || '';
    this.rate = data.rate || '';
    this.selected = data.selected || false;
  }
}
