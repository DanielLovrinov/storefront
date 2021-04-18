import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";
import React, { useEffect, useState } from "react";
// import { useIntl } from "react-intl";
import ReactSVG from "react-svg";

// import { commonMessages } from "@temp/intl";
// import { IProductVariantsAttributesSelectedValues } from "@types";
import { SecondaryButton } from "@components/atoms";

import AddToCartButton from "../../molecules/AddToCartButton";
import QuantityInput from "../../molecules/QuantityInput";
// import ProductVariantPicker from "../ProductVariantPicker";
import {
  canAddToCart,
  getAvailableQuantity,
  getProductPrice,
} from "./stockHelpers";

import truckImg from "images/truck.svg";

// import * as S from "./styles";
import "./scss/index.scss";
// import { productVariants } from "../ProductVariantPicker/fixtures";

// const LOW_STOCK_QUANTITY: number = 5;

export interface IAddToCartSection {
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  productPricing: ProductDetails_product_pricing;
  items: ICheckoutModelLine[];
  queryAttributes: Record<string, string>;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: string | null;
  variantId: string;
  setVariantId(variantId: string): void;
  onAddToCart(variantId: string, quantity?: number): void;
  onAttributeChangeHandler(slug: string | null, value: string): void;
}

const AddToCartSection: React.FC<IAddToCartSection> = ({
  productId,
  availableForPurchase,
  isAvailableForPurchase,
  items,
  name,
  productPricing,
  productVariants,
  queryAttributes,
  onAddToCart,
  onAttributeChangeHandler,
  setVariantId,
  variantId,
}) => {
  // const intl = useIntl();

  const [quantity, setQuantity] = useState<number>(1);
  const [variantStock, setVariantStock] = useState<number>(0);
  const [
    variantPricing,
    setVariantPricing,
  ] = useState<ProductDetails_product_variants_pricing | null>(null);

  const availableQuantity = getAvailableQuantity(
    items,
    variantId,
    variantStock
  );

  const isOutOfStock = !!variantId && variantStock === 0;
  // const noPurchaseAvailable = !isAvailableForPurchase && !availableForPurchase;
  // const purchaseAvailableDate =
  //   !isAvailableForPurchase &&
  //   availableForPurchase &&
  //   Date.parse(availableForPurchase);
  const isNoItemsAvailable = !!variantId && !isOutOfStock && !availableQuantity;
  // const isLowStock =
  //   !!variantId &&
  //   !isOutOfStock &&
  //   !isNoItemsAvailable &&
  //   availableQuantity < LOW_STOCK_QUANTITY;

  const disableButton = !canAddToCart(
    items,
    !!isAvailableForPurchase,
    variantId,
    variantStock,
    quantity
  );

  // const renderErrorMessage = (message: string, testingContextId: string) => (
  //   <S.ErrorMessage
  //     data-test="stockErrorMessage"
  //     data-testId={testingContextId}
  //   >
  //     {message}
  //   </S.ErrorMessage>
  // );

  // const onVariantPickerChange = (
  //   _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
  //   selectedVariant?: ProductDetails_product_variants
  // ): undefined => {
  //   console.log(selectedVariant);
  //   if (!selectedVariant) {
  //     setVariantId("");
  //     setVariantPricing(null);
  //     setVariantStock(0);
  //     return;
  //   }
  //   setVariantId(selectedVariant.id);
  //   setVariantPricing(selectedVariant?.pricing);
  //   setVariantStock(selectedVariant?.quantityAvailable);
  // };

  const [variantCode, setVariantCode] = useState(productVariants[0].sku);

  useEffect(() => {
    setVariantId(productVariants[0].id);
    setVariantCode(productVariants[0]?.sku);
    setVariantPricing(productVariants[0]?.pricing);
    setVariantStock(productVariants[0]?.quantityAvailable);

    // getDiscount(variantPricing);
  }, []);

  function onVPC(event: any, productVariants: any) {
    const sIndex = event.target.options.selectedIndex;
    // console.dir(event.target.options[sIndex]);
    // console.log(productVariants[sIndex]);

    setVariantId(productVariants[sIndex].id);
    setVariantCode(productVariants[sIndex].sku);
    setVariantPricing(productVariants[sIndex]?.pricing);
    setVariantStock(productVariants[sIndex]?.quantityAvailable);
  }

  let disc: any = 0;

  function getDiscount(variantPricing: any) {
    // console.log(variantPricing)

    if (variantPricing.onSale) {
      const initPrice = variantPricing.priceUndiscounted.gross.amount;
      const newPrice = variantPricing.price.gross.amount;

      disc = ((initPrice - newPrice) / initPrice) * 100;

      disc = Math.round(disc);

      // console.log(disc);

      return disc;
    }
  }

  if (variantPricing != null) {
    disc = getDiscount(variantPricing);
  }

  if (disc) {
    const discountTag = document.createElement("div");
    discountTag.append("-");
    discountTag.innerHTML += disc;
    discountTag.innerHTML += "%";
    document.querySelector(".possDisc").appendChild(discountTag);
  }

  let attributeName;

  if (productVariants[0].attributes[0] !== undefined) {
    attributeName = productVariants[0].attributes[0].attribute.name;
  }

  if (quantity < 1) {
    setQuantity(1);
  } else if (quantity > 49) {
    setQuantity(49);
  }

  return (
    <div className="addToCartSection">
      <p className="code" data-test="productID">
        Šifra: <span>{variantCode}</span>
      </p>
      <h4 className="cartTitle" data-test="productName">
        {name}
      </h4>
      <div className="separatorLine" />
      <div className="picker">
        {/* <div className="color">
          <p>Boja</p>
        </div> */}

        {productVariants.length > 1 && (
          <div className="variant">
            <p>{attributeName}</p>
            <div className="Vselect" />
            <select
              className="variantSelect"
              onChange={() => onVPC(event, productVariants)}
            >
              {productVariants.map((p, index) => {
                return <option value={p.id}>{p.name}</option>;
              })}
            </select>
          </div>
        )}
      </div>
      {productVariants.length > 1 && <div className="separatorLine" />}

      {/* PRICE */}
      <h4 className="price">
        {getProductPrice(productPricing, variantPricing)}
      </h4>

      <div className="cartRow">
        <AddToCartButton
          onSubmit={() => onAddToCart(variantId, quantity)}
          disabled={disableButton}
        />
        <div className="quantityInput">
          <button
            className="quantityButton"
            type="button"
            name="subtract"
            onClick={() => setQuantity(quantity - 1)}
          >
            -
          </button>
          <QuantityInput
            quantity={quantity}
            maxQuantity={availableQuantity}
            disabled={isOutOfStock || isNoItemsAvailable}
            onQuantityChange={setQuantity}
            hideErrors={!variantId || isOutOfStock || isNoItemsAvailable}
            testingContext="addToCartQuantity"
          />
          <button
            className="quantityButton"
            type="button"
            name="add"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="separatorLine" />
      {variantStock > 0 && (
        <div className="InStock">
          <ReactSVG path={truckImg} />
          <p>Proizvod je odmah spreman za isporuku</p>
        </div>
      )}
      <div className="productContact">
        <p>
          Pošaljite nam upit o proizvodu ukoliko imate dodatnih pitanja. Naše
          osoblje će Vas kontaktirati u najkraćem mogućem roku.
        </p>
      </div>
      <SecondaryButton className="prodContactButton" testingContext="Upit">
        Pošaljite nam upit
      </SecondaryButton>

      {/* {isOutOfStock ? (
        renderErrorMessage(
          intl.formatMessage(commonMessages.outOfStock),
          "Nije na skladištu"
        )
      ) : (
        <S.ProductPricing>
          {getProductPrice(productPricing, variantPricing)}
        </S.ProductPricing>
      )} */}
      {/* {noPurchaseAvailable &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.noPurchaseAvailable),
          "notAvailable"
        )} */}
      {/* {purchaseAvailableDate &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.purchaseAvailableOn, {
            date: new Intl.DateTimeFormat("default", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }).format(purchaseAvailableDate),
            time: new Intl.DateTimeFormat("default", {
              hour: "numeric",
              minute: "numeric",
            }).format(purchaseAvailableDate),
          }),
          "timeRestrictedAvailability"
        )} */}
      {/* {isLowStock &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.lowStock),
          "lowStockWarning"
        )}
      {isNoItemsAvailable &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.noItemsAvailable),
          "noItemsAvailable"
        )} */}
    </div>
  );
};
AddToCartSection.displayName = "AddToCartSection";
export default AddToCartSection;
