// @ts-nocheck

const patchArrays = () => {
  Array.prototype.count = function (): number {
    return this.length;
  };

  Array.prototype.insert = function (index: number, value: any): any[] {
    if (typeof index !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }

    if (index < 0) {
      this.unshift(value);
    } else if (index >= this.length) {
      this.push(value);
    } else {
      this.splice(index, 0, value);
    }

    return this;
  };

  Array.prototype.remove = function (value: any): any[] {
    const index = this.indexOf(value);

    if (index !== -1) {
      this.splice(index, 1);
    }

    return this;
  };
};

export default patchArrays;
