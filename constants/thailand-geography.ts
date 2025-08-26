// constants/thailandGeography.ts
export type Subdistrict = { code: string; name: string; postalCode: string };
export type District = { code: string; name: string; subdistricts: Subdistrict[] };
export type Province = { code: string; name: string; districts: District[] };

export const provinces: Province[] = [
  {
    code: "10",
    name: "Bangkok",
    districts: [
      {
        code: "101",
        name: "Phra Nakhon",
        subdistricts: [
          { code: "10101", name: "Phra Borom Maha Ratchawang", postalCode: "10200" },
          { code: "10102", name: "Chakraphet", postalCode: "10200" },
        ],
      },
      {
        code: "102",
        name: "Dusit",
        subdistricts: [
          { code: "10201", name: "Dusit", postalCode: "10300" },
          { code: "10202", name: "Bang Khun Phrom", postalCode: "10300" },
        ],
      },
    ],
  },
  {
    code: "11",
    name: "Nonthaburi",
    districts: [
      {
        code: "1101",
        name: "Mueang Nonthaburi",
        subdistricts: [
          { code: "110101", name: "Talat Khwan", postalCode: "11000" },
          { code: "110102", name: "Bang Khen", postalCode: "11000" },
        ],
      },
    ],
  },
];
