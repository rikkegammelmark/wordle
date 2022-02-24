import { details } from "./word-util";

describe('word-util', () => {

  it('test 1', () => {
    expect(details("doggy", "doggy")).toEqual("ppppp")
  })
  it('test 2', () => {
    const result = details("yggod", "doggy");
    console.log(result);
    expect(result).toEqual("llpll")
  })
  it('test 3', () => {
   expect(details("abcef", "doggy")).toEqual("wwwww")
  })
  it('test 4', () => {
   expect(details("ygggd", "doggy")).toEqual("lwppl")
  })
  it('test 5', () => {
   expect(details("ggggg", "doggy")).toEqual("wwppw")
  })
})
