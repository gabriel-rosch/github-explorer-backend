export function paginate(array:any[] = [], page_number:number, page_size:number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}