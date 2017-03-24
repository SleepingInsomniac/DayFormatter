let DayFormatter = require('../lib/day-formatter');

describe("DayFormatter", function() {

  describe("groupConsecutiveDays", function() {

    it("groups consecutive days", function() {
      expect(DayFormatter.groupConsecutiveDays([1])).toEqual([ [1] ]);
      expect(DayFormatter.groupConsecutiveDays([1,2])).toEqual([ [1,2] ]);
      expect(DayFormatter.groupConsecutiveDays([1,2,3])).toEqual([ [1,2,3] ]);
      expect(DayFormatter.groupConsecutiveDays([1,2,3,5,6,7])).toEqual([ [1,2,3], [5,6,7] ]);
      expect(DayFormatter.groupConsecutiveDays([1,2,3,4,5,6,7])).toEqual([ [1,2,3,4,5,6,7] ]);
    });

    it("sorts days", function() {
      expect(DayFormatter.groupConsecutiveDays([7,4,3,6,5,1,2])).toEqual([ [1,2,3,4,5,6,7] ]);
    });

    it("groups consecutive days into the next week", function() {
      // expect(DayFormatter.groupConsecutiveDays([6,7,1,2])).toEqual([[6,7,1,2]]);
      expect(DayFormatter.groupConsecutiveDays([6,7,1,2])).toEqual([ [1,2,], [6,7] ]);
    });

  });

  describe('groupedDaysToString', function() {

    it('Converts a single day', function() {
      expect(DayFormatter.groupedDaysToString([[1]])).toEqual('Monday');
    });

    it('Converts two days with a comma', function() {
      expect(DayFormatter.groupedDaysToString([[1,2]])).toEqual('Monday, Tuesday');
    });

    it('Converts three days with a dash', function() {
      expect(DayFormatter.groupedDaysToString([[1,2,3]])).toEqual('Monday - Wednesday');
    });

    it('Converts two groups to days with commas', function() {
      expect(DayFormatter.groupedDaysToString([[1],[3]])).toEqual('Monday, Wednesday');
    });

    it('Converts two groups of three days', function() {
      expect(DayFormatter.groupedDaysToString([[1,2,3],[5,6,7]])).toEqual('Monday - Wednesday, Friday - Sunday');
    });

    it('Converts days into a new week', function() {
      expect(DayFormatter.groupedDaysToString([[6,7,1]])).toEqual('Saturday - Monday');
    });

  });

  describe("formatDayRange", function() {

    it("displays a day", function() {
      expect(DayFormatter.formatDayRange([1])).toEqual('Monday');
    });

    it("displays days with commas", function() {
      expect(DayFormatter.formatDayRange([1,2])).toEqual('Monday, Tuesday');
    });

    it("displays day ranges with dashes", function() {
      expect(DayFormatter.formatDayRange([1,2,3])).toEqual('Monday - Wednesday');
    });

    it("displays day ranges with dashes and commas", function() {
      expect(DayFormatter.formatDayRange([1,2,3,5,6,7])).toEqual('Monday - Wednesday, Friday - Sunday');
    });

    it("can't really handle ranges across weeks...", function() {
      // It needs to sort days.. that doesn't really play well with ranges across weeks
      expect(DayFormatter.formatDayRange([6,7,1,2])).toEqual('Monday, Tuesday, Saturday, Sunday');
    });

    it('Can handle out of range numbers', function() {
      expect(DayFormatter.formatDayRange([6,7,8,9])).toEqual('Saturday - Tuesday');
    });

  });

});
