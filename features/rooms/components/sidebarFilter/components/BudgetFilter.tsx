import React from 'react';
import { Range, getTrackBackground } from "react-range";
import { useQueryState, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs";

interface BudgetFilterProps {
  minPrice: number;
  setMinPrice: (value: number | null) => void;
  maxPrice: number;
  setMaxPrice: (value: number | null) => void;
}

const MIN = 100;
const MAX = 1000;

export function BudgetFilter({ minPrice, setMinPrice, maxPrice, setMaxPrice }: BudgetFilterProps) {
  const priceValues = [minPrice, maxPrice];
  const sharedOptions = { shallow: false }
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions(sharedOptions));

  const handleRangeChange = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
    setPage(null);
  };

  return (
    <div>
      <h3 className='font-bold mt-3 mb-3 text-[16px]'>Budget</h3>
      <div className='flex gap-2 mb-3'>
        <input 
          type="number" 
          className='p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-500 border border-gray-400 w-25 rounded-lg' 
          placeholder='Min'
          value={minPrice}
          min={MIN}
          max={maxPrice}
          onChange={(e) => setMinPrice(Number(e.target.value) || MIN)}
        />
        <input 
          type="number" 
          className='p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-500 border border-gray-400 w-25 rounded-lg' 
          placeholder='Max'
          value={maxPrice}
          min={minPrice}
          max={MAX}
          onChange={(e) => setMaxPrice(Number(e.target.value) || MAX)}
        />
      </div>

      <div className="w-52 mt-2">
        <Range
          values={priceValues}
          step={10}
          min={MIN}
          max={MAX}
          onChange={handleRangeChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-1.5 rounded "
              style={{
                background: getTrackBackground({
                  values: priceValues,
                  colors: ["#d0d5dd", "#25409c", "#d0d5dd"],
                  min: MIN,
                  max: MAX,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => {
            const { key, ...restProps } = props;
            return (
              <div
                key={key}
                {...restProps}
                className="h-5 w-5 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-500 bg-white border border-gray-600 shadow"
              />
            );
          }}
        />

        <div className="relative h-8">
          <span
            className="absolute top-3 p-1 border shadow-lg border-gray-500 rounded-lg text-sm -translate-x-1/2"
            style={{ left: `calc(${((minPrice - MIN) / (MAX - MIN)) * 100}% )` }}
          >
            ${minPrice}
          </span>

          <span
            className="absolute top-3 p-1 border shadow-lg border-gray-500 rounded-lg text-sm -translate-x-1/2"
            style={{ left: `calc(${((maxPrice - MIN) / (MAX - MIN)) * 100}% )` }}
          >
            ${maxPrice}
          </span>
        </div>
      </div>
    </div>
  );
}