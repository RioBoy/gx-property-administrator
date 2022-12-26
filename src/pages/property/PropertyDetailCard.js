import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { LS_AUTH } from '../../config/localStorage';
import { getPropertDetail, getPropertDetailHistory } from '../../lib/constant';
import { Tab, Tabs } from 'react-bootstrap';
import { numberFormatIDR } from '../../config/currency';
import UserAvatarHistory from '../../assets/images/user-history.png';
import DetailPropertyImage from '../../assets/images/detail-property.jpg';
import ImagePlaceholderDefault from '../../assets/images/image-placeholder-default.jpg';

import Spinner from '../../components/spinner/Spinner';
import PropertyDetailPreviewMap from './PropertyDetailPreviewMap';

const DetailPropertyCard = () => {
  const [propertyDetail, setPropertyDetail] = useState([]);
  const [propertyDetailHistory, setPropertyDetailHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const id = history.location.state.propertyId;
  const token = localStorage.getItem(LS_AUTH);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [history.location.key]);

  const getPropertDetailData = useCallback(() => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: getPropertDetail(id),
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const { results } = response.data;
        setPropertyDetail(results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, token]);

  const getPropertyDetailHistoryData = useCallback(() => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: getPropertDetailHistory(id),
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const { results } = response.data;
        setPropertyDetailHistory(results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, token]);

  useEffect(() => {
    getPropertDetailData();
    getPropertyDetailHistoryData();
  }, [
    getPropertDetailData,
    getPropertyDetailHistoryData,
    history.location.key,
  ]);

  return (
    <>
      {isLoading === true ? (
        <Spinner height="min-vh-100" />
      ) : (
        <>
          <div className="row gap-3 gap-lg-0 p-3 section-2 card flex-row border-0">
            <div className="col-12 col-lg-4">
              <img
                src={DetailPropertyImage}
                alt="Villa"
                className="w-100 h-100 villa-image"
              />
            </div>
            <div className="col-12 col-lg-8">
              <div className="row gap-3 gap-md-0 justify-content-between">
                <div className="col">
                  <h5 className="fw-semibold text-brand-space-cadet mb-2">
                    {propertyDetail.property?.building
                      ? propertyDetail.property?.building.name
                      : propertyDetail.property?.land.name}
                  </h5>
                  <p className="fw-normal text-brand-independence mb-2">
                    {propertyDetail.property?.ownershipStatus.display} •{' '}
                    {propertyDetail.property?.type.display}
                  </p>
                  <p className="fs-9 fw-normal text-brand-rhythm mt-1 mb-2">
                    ID Property
                  </p>
                  <p className="fs-9 fw-normal text-brand-rhythm mb-3">
                    {propertyDetail.property?.number}
                  </p>
                  <div className="d-flex gap-4">
                    <div className="created-on me-1">
                      <p className="fs-9 fw-normal text-brand-rhythm mb-2">
                        Created on
                      </p>
                      <p className="fs-9 fw-normal text-brand-rhythm mb-0">
                        {propertyDetail.property?.createdAt}
                      </p>
                    </div>
                    <div className="entried-by">
                      <p className="fs-9 fw-normal text-brand-rhythm mb-2">
                        Entried by
                      </p>
                      <p className="fs-9 fw-normal text-brand-yankees mb-0">
                        {propertyDetail.property?.createdBy.name}
                      </p>
                    </div>
                  </div>
                  {propertyDetail.property?.status.name === 'pending' ? (
                    <span className="fw-normal text-brand-yankees rounded-2 badge text-bg-brand-crayola px-2">
                      {propertyDetail.property?.status.display}
                    </span>
                  ) : propertyDetail.property?.status.name === 'approved' ? (
                    <span className="fw-normal text-white rounded-2 badge text-bg-brand-mountain-meadow px-2">
                      {propertyDetail.property?.status.display}
                    </span>
                  ) : (
                    <span className="rejected">
                      {propertyDetail.property?.status.display}
                    </span>
                  )}
                </div>
                <div className="col d-flex justify-content-start justify-content-md-end">
                  <h4 className="fs-7 fw-semibold text-brand-amber">
                    IDR{' '}
                    {propertyDetail.property?.priceManagement.IDR
                      .finalEstimation.publicPrice
                      ? numberFormatIDR(
                          propertyDetail.property?.priceManagement.IDR
                            .finalEstimation.publicPrice,
                        )
                      : numberFormatIDR(
                          propertyDetail.property?.priceManagement.IDR
                            .ownerEstimation.publicPrice,
                        )}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row section-3 gap-3 gap-xl-0">
            <div className="col-12 col-lg-7 col-xl-8 card px-0">
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="Main Info" className="px-3">
                  <div className="row">
                    <h5 className="fw-semibold mb-3">General Info</h5>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="contactName"
                          className="fs-9 fw-normal text-brand-rhythm mb-1"
                        >
                          Contact
                        </label>
                        <p className="fw-normal text-brand-yankees">
                          {propertyDetail.property?.building?.contacts?.length >
                          0
                            ? 'Nama contact'
                            : 'Belum ada contact'}
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="villaType"
                          className="fs-9 fw-normal text-brand-rhythm mb-1"
                        >
                          Villa Type
                        </label>
                        <p className="fw-normal text-brand-yankees">
                          {
                            propertyDetail.property?.location.area.types[0].type
                              .display
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="landSize"
                          className="fs-9 fw-normal text-brand-rhythm mb-1"
                        >
                          Land Size
                        </label>
                        <p className="fw-normal text-brand-yankees">
                          {propertyDetail.property?.building
                            ? propertyDetail.property?.building.landSize
                            : propertyDetail.property?.land.totalLandSize}{' '}
                          are
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-brand-rhythm mb-1"
                        >
                          Villa Total Size
                        </label>
                        <p className="fw-normal text-brand-yankees">18 sqm</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-brand-rhythm mb-1"
                        >
                          Year Build
                        </label>
                        <p className="fw-normal text-brand-yankees">2018</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-brand-rhythm mb-1"
                        >
                          Year of Renovation
                        </label>
                        <p className="fw-normal text-brand-yankees">2020</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-brand-rhythm mb-1"
                        >
                          NPWPD
                        </label>
                        <p className="fw-normal text-brand-yankees">Yes</p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-brand-rhythm mb-1"
                        >
                          Roof Type
                        </label>
                        <p className="fw-normal text-brand-yankees">
                          Alang - alang
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Does it have IMB?
                            </label>
                            <p className="fw-normal text-brand-yankees">Yes</p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              IMB Type
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Label
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Valid Until
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Label
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="fullname"
                        className="fs-9 fw-normal text-brand-rhythm mb-1"
                      >
                        IMB Image
                      </label>
                      <img
                        src={ImagePlaceholderDefault}
                        alt="Villa"
                        className="image-placeholder"
                      />
                    </div>
                  </div>
                  <div className="row mb-5">
                    <h5 className="fw-semibold mb-3">Location</h5>
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Location
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              label
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Meeting Point
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Label
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Area
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Label
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Notes
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Label
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 position-relative">
                      <label
                        htmlFor="fullname"
                        className="fs-9 fw-normal text-brand-rhythm mb-1"
                      >
                        Preview Map
                      </label>
                      <PropertyDetailPreviewMap
                        location={history.location.state}
                      />
                    </div>
                  </div>
                  <div className="row mb-5">
                    <h5 className="fw-semibold mb-3">Room</h5>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-brand-rhythm mb-1"
                        >
                          Floor
                        </label>
                        <p className="fw-normal text-brand-yankees">24 are</p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Total Room
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              24 are
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Total Bathroom
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              24 are
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-brand-rhythm mb-1"
                        >
                          Living Room
                        </label>
                        <p className="fw-normal text-brand-yankees">24 are</p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label
                          htmlFor="fullname"
                          className="fs-9 fw-normal text-brand-rhythm mb-1"
                        >
                          Other Room
                        </label>
                        <p className="fw-normal text-brand-yankees">
                          Security Room
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Room Circulation
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Open but can be closed
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              AC
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              With AC
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <h5 className="fw-semibold mb-3">Amenities</h5>
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Building Configuration
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Complex
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Does it have Pool?
                            </label>
                            <p className="fw-normal text-brand-yankees">Yes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Other Room in Residence
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Storage
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Pool Size
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              7 meters x 4 meters
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Pool Type
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Overflow 1
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Does it have Jacuzzi?
                            </label>
                            <p className="fw-normal text-brand-yankees">Yes</p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Garden Type
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Tropycal
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Parking Plot
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Garage
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Jacuzzi Size
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              1 meters x 1 meters
                            </p>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="fullname"
                              className="fs-9 fw-normal text-brand-rhythm mb-1"
                            >
                              Outdoor Amenities
                            </label>
                            <p className="fw-normal text-brand-yankees">
                              Outside Bar
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="profile" title="Facilities" className="px-3">
                  <p className="text-brand-yankees">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Omnis tempore aut fuga voluptates quo maiores illo inventore
                    sequi ratione aspernatur facilis qui suscipit,
                    exercitationem deserunt laborum quia ipsum voluptate, quis
                    consectetur illum tempora veniam itaque obcaecati. Animi,
                    vero adipisci excepturi similique debitis dignissimos itaque
                    cum repellendus deleniti atque a doloremque nemo sit,
                    laborum necessitatibus voluptatem hic optio! Perspiciatis et
                    hic ratione animi perferendis alias aliquid, illo iusto
                    deleniti veritatis, consectetur esse voluptates enim. Itaque
                    natus ut corporis ad. Id, eum. Quos minus eius temporibus
                    vero vitae beatae quia, consectetur itaque. Laborum
                    provident beatae accusantium commodi facere blanditiis
                    necessitatibus dolorum, dolore laudantium ex iusto harum
                    tenetur fuga totam eius quis autem. Ex quasi voluptatem
                    neque, sint consequatur nisi iure, molestias quae ullam
                    necessitatibus culpa maiores corporis modi, quia nemo earum
                    tenetur blanditiis! Qui iusto nobis quod corrupti possimus
                    ullam laboriosam quos excepturi, quae doloribus repudiandae
                    a debitis vero, nostrum mollitia impedit minus? Voluptas
                    eius maxime alias aspernatur velit adipisci nihil laboriosam
                    maiores? Sint iusto qui accusantium voluptates perspiciatis
                    facilis cumque hic asperiores quam assumenda totam itaque
                    minima corporis beatae voluptatem quasi repudiandae eum,
                    omnis atque repellat praesentium obcaecati? Odio non, quasi
                    cumque maxime accusantium ea culpa laborum dolorum,
                    doloribus voluptates vel error similique mollitia eligendi
                    harum, vitae ipsam dolorem atque. Beatae ipsam, excepturi
                    accusantium, rem illum consequuntur at quam nam itaque sunt
                    eveniet voluptate exercitationem iusto aliquid omnis
                    provident porro corrupti optio facere, quaerat quod. Rerum
                    illo vitae similique minima iure aliquam saepe repellat
                    adipisci corrupti sed maiores odit eveniet doloribus quos
                    ullam possimus dolore debitis sint, doloremque optio et
                    quasi! Esse nam repellat eos autem aperiam placeat provident
                    adipisci expedita tempore eius numquam consectetur culpa
                    quisquam ipsa ullam voluptas, molestiae optio quasi quidem
                    sint reprehenderit tenetur ratione. Dignissimos ipsum
                    aspernatur et reprehenderit harum? Dolor provident quidem
                    obcaecati dicta, dolore sapiente similique mollitia beatae
                    tempora nobis eos animi commodi doloremque earum sunt optio
                    consequatur eius laudantium aspernatur dolorem! Deleniti
                    sapiente vel voluptates obcaecati necessitatibus eius, enim
                    recusandae facilis aliquam magni ullam praesentium, natus
                    atque molestiae omnis nostrum temporibus nam architecto ad.
                    Natus, autem voluptas? Qui iste dolore quibusdam atque
                    tempora error eos molestias, perferendis ipsa, nulla,
                    similique eum veniam. Laboriosam, dolorum dolor. Corporis,
                    hic? Impedit quas accusamus commodi praesentium cumque
                    molestiae blanditiis non consectetur vitae, neque ab,
                    voluptatibus in inventore quos animi iste incidunt libero
                    temporibus repellendus perferendis ea laboriosam qui unde.
                    Iste minus consectetur excepturi earum. Laboriosam minima
                    amet dolore nemo vitae facere earum ipsum nihil repudiandae
                    fugit quis adipisci corporis magni debitis mollitia nobis
                    dicta, voluptas deserunt atque aliquam esse odio! Commodi
                    obcaecati deserunt at illum explicabo fugiat doloremque, a
                    ullam. Quis maiores quaerat distinctio, expedita soluta
                    nobis. Deserunt, error, commodi recusandae enim ut saepe ab
                    impedit pariatur nulla aperiam molestiae, voluptatem aut
                    libero. Provident nam, excepturi tempore sunt quod corrupti
                    suscipit a hic dicta? Ut totam cumque, quia maiores tempore
                    commodi quisquam, natus dolores, aliquid voluptates vitae
                    placeat! Ad accusantium esse explicabo perspiciatis nemo
                    praesentium possimus aliquid officia id similique beatae
                    animi saepe officiis ex, neque consequuntur quas.
                  </p>
                </Tab>
              </Tabs>
            </div>
            <div className="col-12 col-lg-4 col-xl-4 ps-0 ps-lg-3 pe-0">
              <div className="card">
                <h5 className="fs-7 fw-medium mb-2">History</h5>
                {propertyDetailHistory.histories?.map((propertyHistory) => (
                  <div
                    className="history-item mb-2 p-2"
                    key={propertyHistory.id}
                  >
                    <img
                      src={UserAvatarHistory}
                      alt="User"
                      className="rounded-circle"
                    />
                    <div className="user-history">
                      <p className="fs-9 text-brand-yankees mb-1">
                        <span className="fw-semibold mt-0 ps-0">
                          {propertyHistory.createdBy}
                        </span>{' '}
                        {propertyHistory.description},{' '}
                        <span className="fw-semibold mt-0 ps-0">
                          {propertyHistory.description.split(' ').splice(-1)}
                        </span>{' '}
                        with customer
                      </p>
                      <p className="fs-10 text-brand-cadet-blue">
                        {propertyHistory.createdAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailPropertyCard;
