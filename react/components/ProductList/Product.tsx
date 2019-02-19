import React, { FunctionComponent } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import ProductImage from '../../ProductImage'
import FormattedPrice from '../Payment/FormattedPrice'

interface Props {
  productInfo: OrderItem
  currency: string
}

const Product: FunctionComponent<Props & InjectedIntlProps> = ({
  productInfo,
  currency,
  intl,
}) => {
  const showMeasurementUnit =
    productInfo.unitMultiplier !== 1 || productInfo.measurementUnit !== 'un'

  return (
    <div className="flex justify-between flex-column-s flex-row-m pv5">
      <div className="flex items-center flex-column flex-row-m mr8-m">
        <div className="mw4 mr5">
          <ProductImage
            url={productInfo.imageUrl}
            alt={productInfo.name}
            className="mr5"
          />
        </div>
        <div className="flex flex-column items-between h-100">
          <a
            href={productInfo.detailUrl}
            className="t-body c-muted-1 no-underline"
            target="_blank"
          >
            <p>
              {productInfo.name}
              {showMeasurementUnit && (
                <small className="t-mini c-on-base tc tl-m">
                  <br />
                  {`${productInfo.unitMultiplier} ${
                    productInfo.measurementUnit
                  }`}
                </small>
              )}
            </p>
          </a>
          <p className="t-mini c-muted-1 tc tl-m">
            {intl.formatMessage(
              { id: 'products.quantity' },
              {
                quantity: productInfo.quantity,
              }
            )}
          </p>
        </div>
      </div>
      <p className="tc tr-m">
        <FormattedPrice
          value={productInfo.price * productInfo.quantity}
          currency={currency}
        />
      </p>
    </div>
  )
}

export default injectIntl(Product)