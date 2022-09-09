const {
  checkPersonObject,
  checkCreditCardObject,
  checkPaymentObject,
} = require("./payment");

describe("objects", () => {
  it("check valid person object", () => {
    const person1 = {
      firstName: "James",
      middleName: "Roger",
      lastName: "Smith",
    };
    const person2 = {
      firstName: "Mary",
      middleName: "Anna",
      lastName: "Miller",
    };

    expect(checkPersonObject(person1)).toBe(true);
    expect(checkPersonObject(person2)).toBe(true);
  });

  it("missing middlename is valid", () => {
    const person1 = {
      firstName: "James",
      lastName: "Smith",
    };
    const person2 = {
      middleName: "Anna",
      lastName: "Miller",
    };
    const person3 = {
      lastName: "Miller",
    };
    const person4 = {
      firdstName: "Miller",
    };
    const person5 = {
      middletName: "Miller",
    };
    expect(checkPersonObject(person1)).toBe(true);
    expect(checkPersonObject(person2)).toBe(false);
    expect(checkPersonObject(person3)).toBe(false);
    expect(checkPersonObject(person4)).toBe(false);
    expect(checkPersonObject(person5)).toBe(false);
  });

  it("check valid creditCard object", () => {
    const cc1 = {
      number: "0123456789012345",
      cvc: "123",
    };
    const cc2 = {
      number: "1234567890123456",
      cvc: "456",
    };

    expect(checkCreditCardObject(cc1)).toBe(true);
    expect(checkCreditCardObject(cc2)).toBe(true);
  });

  it("check invalid creditCard object", () => {
    const cc1 = {
      number: "01234567012345", // invalid length
      cvc: "123",
    };
    const cc2 = {
      number: "1234567890123456",
      // cvc missing
    };

    expect(checkCreditCardObject(cc1)).toBe(false);
    expect(checkCreditCardObject(cc2)).toBe(false);
  });

  it("American Express cards should not be accepted", () => {
    const cc1 = {
      number: "37234567012345",
      cvc: "123",
      company: "AMex",
    };
    const cc2 = {
      number: "3434567890123456",
      cvc: "123",
      company: "amex",
    };
    const cc3 = {
      number: "8759845769540096",
      cvc: "436",
      company: "visa",
    };

    expect(checkCreditCardObject(cc1)).toBe(false);
    expect(checkCreditCardObject(cc2)).toBe(false);
    expect(checkCreditCardObject(cc3)).toBe(true);
  });

  it("check valid payment object", () => {
    const payment = {
      sum: 12,
    };

    expect(checkPaymentObject(payment)).toBe(true);
  });

  it("check invalid payment object", () => {
    const payment1 = {
      sum: -1,
    };
    const payment2 = {
      sum: 1,
    };
    const payment3 = {
      sum: 0,
    };
    const payment4 = {
      sum: -1 * 3,
    };
    expect(checkPaymentObject(payment1)).toBe(false);
    expect(checkPaymentObject(payment2)).toBe(true);
    expect(checkPaymentObject(payment3)).toBe(true);
    expect(checkPaymentObject(payment4)).toBe(false);
  });
});
