import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
    transform(value: string, query: string): string {
        if (!value || !query) {
            return value;
        }

        // Escape special characters in the query to avoid issues with regex
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi'); // Case-insensitive match

        // Replace matches with highlighted span
        return value.replace(regex, '<span class="highlight">$1</span>');
    }
}