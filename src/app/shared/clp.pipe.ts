import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'clp', standalone: true })
export class ClpPipe implements PipeTransform {
  private readonly fmt = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  });

  transform(value: number | null | undefined): string {
    if (value == null) return '';
    return this.fmt.format(value);
  }
}
