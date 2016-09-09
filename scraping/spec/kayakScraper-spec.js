var kayak = require("../kayakScraper");

describe("Test Kayak Scraper", function(){
  describe("Get Formatted Date with double-digit day", function(){
    it("should return formatted date without day change", function(){
      var formattedDate = kayak.getFormattedDate(new Date(2016, 10, 11));
      expect(formattedDate).toBe("2016-11-11");
    });
  });
});
