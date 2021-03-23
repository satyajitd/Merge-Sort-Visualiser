class MergeSort {
    constructor(input) {
        this.valid;
        this.levelArrayID = []
        this.array = input.trim().split(' ')
        this.content = {
            'arrayValues': [],
            'steps' : [],
            'partitions': [],
            'elements': []
        }

        this.validate()
    }

    validate() {
        this.valid = true

        for(let i = 0; i < this.array.length; i++) {
            const str = this.array[i]
            for(let j = 0; j < str.length; j++) {
                if(str.charCodeAt(j) < 48 || str.charCodeAt(j) > 57) {
                    this.valid = false;
                    break;
                }
            }
            if(!this.valid)
                break;
        }

        this.parseArray()
        return this.valid
    }

    isValid() {
        return this.valid
    }

    parseArray() {
        if(this.valid) {
            this.array = this.array.map(x => parseInt(x))
            this.content.arrayValues = this.array
            this.Sort(0, this.array.length - 1, 0)
        }
    }

    merge(l, r, level) {
        const new_arr = [];
        let mid = Math.floor((r - l)/2) + l ;
        let i = l, j = mid + 1, k = l;
        let child1 = 0, child2 = 0, ptr = 0;

        while(i <= mid && j <= r) {
            const step = {
                'parent': level,
                'arrayID': this.levelArrayID[level],
                'childArrayIDs': [],
                'arrayElementID': ptr,
                'childArrayElementIDs': [],
                'value': -1
            }
            
            step['childArrayIDs'].push(this.levelArrayID[level + 1] - 1)
            step['childArrayIDs'].push(this.levelArrayID[level + 1]) 

            step['childArrayElementIDs'].push(child1)
            step['childArrayElementIDs'].push(child2)

            if(this.array[i] <= this.array[j]) {
                step['value'] = this.array[i]
                new_arr.push(this.array[i++])
                child1++
            }
            else {
                step['value'] = this.array[j]
                new_arr.push(this.array[j++]);
                child2++
            }
            ptr++
            this.content.steps.push(step)
        }

        while(i <= mid) {
            const step = {
                'parent': level,
                'arrayID': this.levelArrayID[level],
                'childArrayIDs': [],
                'arrayElementID': ptr,
                'childArrayElementIDs': [],
                'value': -1
            }

            step['childArrayIDs'].push(this.levelArrayID[level + 1] - 1)
            step['childArrayElementIDs'].push(child1)
            step['value'] = this.array[i]
            
            new_arr.push(this.array[i++]);
            ptr++;
            child1++
            this.content.steps.push(step)
        }

        while(j <= r) {
            const step = {
                'parent': level,
                'arrayID': this.levelArrayID[level],
                'childArrayIDs': [],
                'arrayElementID': ptr,
                'childArrayElementIDs': [],
                'value': -1
            }

            step['childArrayIDs'].push(this.levelArrayID[level + 1])
            step['childArrayElementIDs'].push(child2)
            step['value'] = this.array[j]
            
            new_arr.push(this.array[j++]);
            ptr++;
            child2++
            this.content.steps.push(step)
        }

        for(i = 0; i < new_arr.length; i++, k++)
            this.array[k] = new_arr[i];
    }

    Sort(l, r, level) {
        if(l <= r) {
            if(!this.levelArrayID.hasOwnProperty(level))
            {
                this.content.partitions[level] = []
                this.levelArrayID[level] = 0
            }    
            else
                this.levelArrayID[level]++;

            this.content.partitions[level].push(r - l + 1)

            if(l === r) {
                if(level !== this.content.partitions.length - 1)
                {
                    this.content.partitions[level + 1].push(1)
                    this.content.partitions[level + 1].push(1)

                    this.levelArrayID[level + 1] += 2
                }

                this.content.elements.push({
                    "level" : level,
                    "arrayID": this.levelArrayID[level],
                    "value": this.array[l]
                })
                return;
            }
                
            let mid = Math.floor((r - l)/2) + l;
    
            this.Sort(l, mid, level + 1);
            this.Sort(mid + 1, r, level + 1);
            this.merge(l, r, level);
        }
    }

    getContent() {
        return this.content
    }
}

module.exports = MergeSort